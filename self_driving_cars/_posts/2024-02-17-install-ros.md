---
layout: post
title: "Install ROS2 on Fedora"
author:
- Andrei Radulescu-Banu
---

Source: https://docs.ros.org/en/rolling/Installation/Alternatives/RHEL-Development-Setup.html

Set up locale

```bash
locale  # check for UTF-8

sudo dnf install langpacks-en glibc-langpack-en
export LANG=en_US.UTF-8

locale  # verify settings
```

Enable required repos

```bash
sudo dnf install -y \
  cmake \
  gcc-c++ \
  git \
  make \
  patch \
  python3-colcon-common-extensions \
  python3-mypy \
  python3-pip \
  python3-pydocstyle \
  python3-pytest \
  python3-pytest-repeat \
  python3-pytest-rerunfailures \
  python3-rosdep \
  python3-setuptools \
  python3-vcstool \
  wget

# install some pip packages needed for testing and
# not available as RPMs
python3 -m pip install -U --user \
  flake8-blind-except==0.1.1 \
  flake8-class-newline \
  flake8-deprecated
```

Get Ros2 code

```
mkdir -p ~/build/ros2_rolling/src
cd ~/build/ros2_rolling
vcs import --input https://raw.githubusercontent.com/ros2/ros2/rolling/ros2.repos src
```

Install dependencies using rosdep

```bash
sudo dnf update

sudo rosdep init
rosdep update
rosdep install --from-paths src --ignore-src -y --skip-keys "fastcdr ignition-cmake2 ignition-math6 rti-connext-dds-6.0.1 urdfdom_headers"
```

Edit ~/build/ros2_rolling/build/rviz_assimp_vendor/assimp_vendor-prefix/src/assimp_vendor/code/AssetLib/glTF2/glTF2Exporter.cpp:

```
    // Default Sheen color factor {0,0,0} disables Sheen, so do not export
    //if (sheen.sheenColorFactor == defaultSheenFactor)
    //    return false;
    if (memcmp(sheen.sheenColorFactor, glTF2::defaultSheenFactor, sizeof(sheen.sheenColorFactor)) == 0) {
    // Arrays have the same content and memory layout
      return false;
    }
```

Build the code in the workspace

```bash
# Export RPM_ARCH
export RPM_ARCH=$(uname -m)
export RPM_PACKAGE_RELEASE=1.0.0
export RPM_PACKAGE_VERSION=1.0.0
export RPM_PACKAGE_NAME=ros

cd ~/build/ros2_rolling/
colcon build --symlink-install

# To skip packages that are not building properly:
# colcon build --symlink-install --packages-skip image_tools intra_process_demo

# To build specific packages
# colcon build --symlink-install --packages-select rviz_default_plugins

```

Setup environment

```bash
# Replace ".bash" with your shell if you're not using bash
# Possible values are: setup.bash, setup.sh, setup.zsh
. ~/build/ros2_rolling/install/local_setup.bash
```

Set up C++ talker

```bash
. ~/build/ros2_rolling/install/local_setup.bash
ros2 run demo_nodes_cpp talker
```

Set up Python listener in another terminal

```bash
. ~/build/ros2_rolling/install/local_setup.bash
ros2 run demo_nodes_py listener
```