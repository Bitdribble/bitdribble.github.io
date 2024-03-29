---
layout: page
mathjax: true
title: Microsoft Azure Software Stack
---

#### Posts
* Simon Whiteley: [The Azure Spark Showdown - Databricks VS Synapse Analytics](https://www.youtube.com/watch?v=FjsnVueXijQ) (2021)
* [Azure Data Lake Design and Implementation Patterns](https://www.youtube.com/watch?v=iiyWKul1p6k) (2022)
  * Storage Accounts
  * Containers
  * File storage, which can be mounted from Windows, Linux, Mac, and can be ETL'd into containers
  * Storage explorer, used to navigate through containers and file storage
  * Ingesting data
    * Azure Data Factory / SSIS
    * Distcp/AzCopy
    * Sqoop
    * Other ETL Tools: Talend, Matillion, 5Tran, Airflow
  * Azure Data Catalog
  * Security Principals
    * User
    * Group
    * Service Principal
    * Managed Identity - Azure Service itself will have this kind of identity
  * Storage Acct can use Storage Acct keys but that is not recommended.
  * Next best level of security is Shared Access keys
  * RBAC (roles based access control) - recommended
  * Posix ACLs - not recommended
  * Firewall

#### Other
* [Cloud Data Platform](../cloud_data_platform.md)
* [Machine Learning](../machine_learning.md)

