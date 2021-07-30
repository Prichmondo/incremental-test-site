## 🚀 Quick start

This project is meant to reproduce an bug with Gatsby Static Queries on incremental build.
Pages using Static Queries do not get rebuilt when the content (returned by the query) changes.
Page queries work fine.

This project emulates the implementation of a real project of the company I work for.
There are few specifications that is meant to mention:

**Dynamic pages**
Site pages are dynamic and pulled from a json (src/data/pages) in gatsby-node sourceNodes and injected into the site data.
In gatsby-node createPage pages get retrieved via graphql and created using createPage action.

**Dynamic data**
A list of countries in a json file (src/data/pages) is pulled at build time and injected into the site data in gatsby-node sourceNodes.
It is done to emulate any kind of dynamic data source that can be stored and retrieved via graphql (PageQuery or StaticQuery).

**Templates**
Pages can have different templates (src/components/templates). There are two templates: Default and Countries.
Both templates display the page data and a list of countries.
In Default template the list of countries is retrieved by using a PageQuery.
In Countries template the list of countries is retrieved by using a StaticQuery.

**The issue**
When data in countries.json changes, the list of countries for pages using countries template is not updated all the time. It seems that Gatsby is not able to detect an update coming from a StaticQuery all the time, while the page using a PageQuery works just fine.

Follow the instruction below to reproduce the bug:

1.  **Install the project**

    Install the project.

    ```shell
    npm install
    ```

2.  **Build**

    Run the following command to have a first build.

    ```shell
    npm run build
    ```
    Run the command again. The second build should be incremental.
    Try untill you get the message "info There are no new or changed html files to build."
    At this point the pages have been cached and they will not get rebuilt unless there are further changes to them (from code or contents).

3.  **Update the list of countries**

    Add or remove a country to countries.json

4.  **Build again**

    Run build command again. This step might need to be repeated multiple time (usually twice) before the issue comes out. 
    At any run compare the home and the /countries page. The list of countries should always be the same on both pages, instead it will end up to have a different list between pages using Page Queries and those using Static Queries.
