---
layout: post
title: "Porting Python2.7 code to Python3.6"
categories: python
author:
- Andrei Radulescu-Banu
---

Python2 has been [obsoleted on Jan 1, 2020](https://www.python.org/doc/sunset-python-2/). The Python community has stopped distributing bugfixes for it. The pip program for installing packages for python2 [has stopped working in January 2021](https://pip.pypa.io/en/stable/news/#id4).

Large code projects that were implemented on top of python2 need to be ported to python3. But how can that be done?

Recently, I worked to port [Apollo ROS](https://github.com/ApolloAuto/apollo-platform/tree/1.5.5), a self driving middleware stack, from Python2 to Python3. This post shows the steps.

The specific python version we are porting from is 2.7, and the target python version is 3.6. Our operating system distribution is Ubuntu 18.

# Porting strategy

If the project is small, or is already close to working on python3, you have the option to port it to python3 in-place, supporting both python2 and python3 in the same source code.

In our case, however, the amount of changes is considerable, and we have to make changes incremetally, maintaining backward compatibility with python2 until we're ready to swicth over to python3.

Thus, our solution is to clone the ROS python2 source code to a different folder, and work on the copy. We have to also ensure that the python2 & python3 code gets installed in different locations, so it may be run in parallel.

# What are the porting steps?

The easy steps:
* Run 2to3 tool to convert ROS sources to python3
  * This breaks python2 compatibility
  * However, since we are working on a clone of the python2 sources, this is not an issue
* Hand-fix what 2to3 tool did not get right
* Change shell magic to ```#!/usr/bin/env python3``

More difficult steps:
* Hand-fix all bytes <-> unicode conversions
* Port all C modules to use python3 C interface
* Tricky fixes had to be implemented in specific code modules that deal with message passing and threading (specifically, the Apollo ROS eprosima transport, boost threads, and swig wrappers)
  * Python3 links against different pthread implementation, and this necessitated changes in the thread exit mechanism in some of the C-based Apollo ROS modules

# What are differences between Python versions?

We're listing here the most important differences between Python versions 2 and 3.

## Linux shell script shebang

If your operating system distribution supports both python2 and python3, e.g. as is the case on Ubuntu 18, you must change the shell shebang in the python scripts.

* For Python2: ```#!/usr/bin/env python```
* For Python3: ```#!/usr/bin/env python3```

## Print statements

For Python2, print statements don't necessarily use parents. For python3, parents are required.

* For Python2: ```print “hello world”```
* For Python3: ```print(“hello world”)```

## Binary vs unicode

* In Python2, ```strings``` are ```bytes```, and ```unicode``` is a separate type
* In Python3, ```strings``` are ```unicode```, and ```bytes``` is a separate type

To convert from ```string``` to ```bytes``` in python3, use ```str.encode("utf-8")```. To convert in the other direction, from ```bytes``` to ```string```, use ```bytes.decode("utf-8")```.

<p align="center">
<img width="350" height="200" src="/src/diagrams/string_bytes.png"><br>
Convert between string and bytes in Python3
</p>

The only good way to determine, in the code, which python3 strings beed to be decoded from bytes, is to run the code. Thus, good code coverage tools are essential for the porting work.

## Dictionary keys

* In Python2, dictionary ```keys()``` are a list:
```
>>> newdict = {1:0, 2:0, 3:0}
>>> newdict.keys()
[1, 2, 3]
```

* In Python3, dictionary ```keys()``` are not a list. You have to cast them to a list, to obtain backward compatible code:
```
>>> newdict = {1:0, 2:0, 3:0}
>>> newdict.keys()
dict_keys([1, 2, 3])
>>> list(newdict.keys())
[1, 2, 3]
```

## Relative imports

* In Python2, relative imports can be implicit.
* In Python3, no implicit relative imports are allowed within a package.

For example, assume this package file layout:

```
mypkg
├── base.py
└── derived.py

# Python2, in derived.py:
from base import BaseThing

# Python3, in derived.py:
from .base import BaseThing
```

## String %-formatting

In Python 2&3, we can use string ```%-formatting```, for example:
```
name = “World”
"Hello, %s" % name
```
This formatting has two problems:
* We need to know type of name argument, and use
  * %s for string
  * %d for int
  * %f for float, etc
* It's hard to keep track of positions:

```
“Hello %s %s %s %s %s” % “World”, “from”, “out”, “of”, “space”
```

## String str.format()

We can also use ```str.format()``` in Python 2&3:
```
name = “World”
"Hello, {}".format(name)
```
* We don't need to know the type of ```name```!
* It is easy to keep track of positions:
```
“Hello {world=w} {from=f} out of space”.format(w=”world”, f=”from”)
```

There is a problem though with ```str.format()```: It does not support lazy evaluation. In the example below, when the log level is higher than debug, we don't want the string format to be evaluated:
```
logger.debug(“Hello, {}”.format(name)) # Evaluated even if log level > debug
logger.debug(“Hello %s”, name) # Lazy evaluation - better!
```

Thus, for performance reasons, sometimes ```%-formatting``` is better than ```str.format()```.

## f-String formatting

Python3 offers a new way to do formatting: ```f-strings```
```
name = “World”
f"Hello, {name}"
```

This format is preferred, because it keeps it easy to track argument positions, and it supports lazy evaluation:
```
name=”World”
logger.debug(“Hello, {}”.format(name)) # Immediate evaluation
logger.debug(“Hello %s”, name) # Lazy evaluation 
logger.debug(f“Hello {name}”) # Lazy evaluation
```