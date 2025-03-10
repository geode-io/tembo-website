---
sidebar_position: 3
tags:
  - api
  - configuration
---

# Postgres Configuration

Postgres allows for setting a wide range of configuration options. These configurations include settings for memory, vacuum, 
extensions, logging, and more.

This document will guide you through the process of setting Postgres configuration values on Tembo Cloud.
For a full list of configuration options, visit https://postgresqlco.nf/doc/en/param/.

## Setting Postgres Configuration Values via the Tembo Cloud API

:::note
Configuration values set via API are not validated. Please ensure the configuration value you're setting is valid.
More information on valid Postgres configuration values can be found at https://postgresqlco.nf/doc/en/param/.
:::

1. Generate an API token for communicating with your Tembo instance. Navigate to https://cloud.tembo.io/generate-jwt and follow the instructions to generate a token.


2.  Set the following environment variables:

    ```sh
    export TEMBO_TOKEN=<your token>
    export TEMBO_ORG=<your organization id>
    export TEMBO_INST=<your instance id>
    ```

3. Patch your existing Tembo instance with new configuration values using the [Tembo Cloud Platform API](https://tembo.io/docs/tembo-cloud/openapi):

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="Curl">

```shell
curl -X 'PATCH' \
  "https://api.tembo.io/api/v1/orgs/$TEMBO_ORG/instances/$TEMBO_INST" \
  -H "accept: application/json" \
  -H "Authorization: Bearer $TEMBO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "postgres_configs": [
    {
      "name": "max_connections",
      "value": "500"
    },
    {
      "name": "log_connections",
      "value": "on"
    },
    {
      "name": "log_disconnections",
      "value": "on"
    }
  ]
}'
```

</TabItem>
</Tabs>

## Confirming Configuration Values are Applied

You can confirm that your configuration values are applied by connecting to your Postgres instance and running `SHOW <configuration-name>`:

```shell
postgres=# SHOW max_connections;
 max_connections
-----------------
 500
(1 row)

postgres=# SHOW log_connections;
 log_connections
-----------------
 on
(1 row)

postgres=# SHOW log_disconnections;
 log_disconnections
--------------------
 on
(1 row)
```

## Setting Postgres Configuration Values via the Tembo Cloud UI

Log in to the [Tembo Cloud UI](https://cloud.tembo.io/) and select the "Database" tab in the navigation bar. In the "Configurations" view, you can tune a set of configuration parameters.

The form is not an exhaustive list of parameters. If you need to tune a parameter that is not in the form, you can add a custom entry at the bottom. If the value has an associated unit, please include it in the format `<number><unit>` e.g. `1GB` or `128KB`.

:::info
If you enter an invalid field or value in the custom configurations section, your instance may get stuck in the configuring state. If this happens, please delete the erroneous field and save your changes to restore it.
:::
