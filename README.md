# CCScheduleViewer

Private-ish project for a sharepoint webpart that reads data from **Content and Code**'s 
enterprise schedule spreadsheet and displays it in a nicer way

Based on the Angular2 starter https://david-dm.org/preboot/angular2-webpack

# Steps to make it work in SP

## Hack the Zone.js module

In `node_modules/zone.js/dist/zone.js`, comment out the line throwing an exception. Reason: `window.Zone` is defined by SP.

```javascript
var Zone$1 = (function (global) {
    if (global.Zone) {
        //throw new Error('Zone already loaded.');
    }
    //...
```



## Use the `cewp-index.html` file for the CEWP

* It's a div, not a whole `<html>` page
* Routes are amended with the files stored in Sharepoint

```html
<div>
  <link href="/sites/pmo/scheduleviewer/SiteAssets/dist/css/app.css" rel="stylesheet">
  <!--<my-app docUrl="/files/Enterprise Schedule 2016.xlsm">Loading...</my-app>-->
  <my-app docUrl="/sites/pmo/EnterpriseSchedule/Enterprise Schedule 2016.xlsm">Loading...</my-app>

  <script type="text/javascript" src="/sites/pmo/scheduleviewer/SiteAssets/dist/js/polyfills.js"></script>
  <script type="text/javascript" src="/sites/pmo/scheduleviewer/SiteAssets/dist/js/vendor.js"></script>
  <script type="text/javascript" src="/sites/pmo/scheduleviewer/SiteAssets/dist/js/app.js"></script>
</div>
```

## Tweak the route to the `excel-worker.js` file

1. Open `dist/js/app.js`
2. Find reference to `excel-worker.js` and hardcode with the SP route e.g:
```javascript
t.exports=function(){return new Worker("/sites/pmo/scheduleviewer/SiteAssets/dist/excel-worker.js")}
```


