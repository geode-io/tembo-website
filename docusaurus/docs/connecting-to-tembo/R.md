:::info

Please make sure you secure your Tembo Postgres credentials

:::
It is important to have the correct package versions
```r title="dependencies.r"
install.packages('RPostgres') #version 1.4.6 or greater
install.packages('DBI') #version 1.1.3 or greater
install.packages('magrittr') #version 2.0.3 or greater
```
**Test the Connection**

```r title="main.r"
library(DBI)
library(RPostgres)
library(magrittr)

#Connection string
connection_string <-"postgresql://postgres:******@your-subdomain-here.data-1.use1.tembo.io:5432/postgres"


# Parse Connection String
parsed <- sub("postgresql://", "", connection_string) %>% strsplit(":") %>% unlist()
username <- parsed[1]
password_host_port_db <- strsplit(parsed[2], "@")[[1]]
password <- password_host_port_db[1]
host_port_db <- strsplit(password_host_port_db[2], ":")[[1]]
hostname <- host_port_db[1]
port_db <- strsplit(parsed[3], "/")[[1]]
port <- port_db[1]
database <- port_db[2]

#test connection
tryCatch({
  con <- dbConnect(RPostgres::Postgres(), dbname = database, host = hostname, port = port, user = username, password = password)
  res <- dbSendQuery(con, "SELECT 1")
  output <- dbFetch(res)[1, 1]
  print(output)
  dbClearResult(res)
  dbDisconnect(con)
}, error = function(e) {
  print(paste("An error occurred:", e))
})

```
## Support and Community

If you encounter any issues, please check out our [troubleshooting guide](https://tembo.io/docs/tembo-cloud/configuration-and-management/troubleshooting) or contact [support@tembo.io](mailto:support@tembo.io).

You're also welcome to join our [Tembo Community](https://join.slack.com/t/tembocommunity/shared_invite/zt-23o25qt91-AnZoC1jhLMLubwia4GeNGw) to meet and collaborate with other Tembo users.
