# EVT-CONFIG

Simple programmatic and cli helper to manage account or other configurations.

## Installation

```
npm i evt-config -g
```
Global installation is reqiured only if you want to take advantage of using globally available CLI tool.

## Programmatic

```
require('evt-config')('QA6').then(EVT.setup');
```

## CLI

```
evt-config add QA6.apiUrl https://api-eu.evrythng.com
```
More examples could be found running
```
evt-config --help
```
