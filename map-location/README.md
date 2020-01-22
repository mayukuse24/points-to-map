# MapLocation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


When we upload this to ECS beanstalk this error appears:
Need to fix it for beanstalk


-------------------------------------
/var/log/eb-docker/containers/eb-current-app/eb-4526884cc716-stdouterr.log
-------------------------------------
> map-location@0.0.0 start /app
> ng serve

[34mâ„¹[39m [90mï½¢wdsï½£[39m: Project is running at http://localhost:4200/webpack-dev-server/
[34mâ„¹[39m [90mï½¢wdsï½£[39m: webpack output is served from /
[34mâ„¹[39m [90mï½¢wdsï½£[39m: 404s will fallback to //index.html

chunk {main} main.js, main.js.map (main) 33.9 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 264 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.15 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 9.68 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 4.57 MB [initial] [rendered]
Date: 2020-01-22T03:45:46.796Z - Hash: eb68f05eee4cd2c859fd - Time: 16809ms
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
[34mâ„¹[39m [90mï½¢wdmï½£[39m: Compiled successfully.



-------------------------------------
/var/log/docker-ps.log
-------------------------------------
'docker ps' ran at Wed Jan 22 03:48:43 UTC 2020: 
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
4526884cc716        25efcb445ee6        "docker-entrypoint.sâ€¦"   3 minutes ago       Up 3 minutes        4200/tcp            eager_hofstadter
'docker ps' ran at Wed Jan 22 03:55:20 UTC 2020: 
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS               NAMES
5a731e1ac7d8        25efcb445ee6        "docker-entrypoint.sâ€¦"   About a minute ago   Up About a minute   4200/tcp            objective_boyd



-------------------------------------
/var/log/nginx/error.log
-------------------------------------
2020/01/22 03:46:44 [error] 4627#0: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 76.184.116.149, server: , request: "GET / HTTP/1.1", upstream: "http://172.17.0.2:4200/", host: "mapaddress-env-1.6fpdntwmhv.us-east-1.elasticbeanstalk.com"
2020/01/22 03:52:35 [error] 4627#0: *3 connect() failed (111: Connection refused) while connecting to upstream, client: 76.184.116.149, server: , request: "GET / HTTP/1.1", upstream: "http://172.17.0.2:4200/", host: "mapaddress-env-1.6fpdntwmhv.us-east-1.elasticbeanstalk.com"
2020/01/22 03:52:35 [error] 4627#0: *3 connect() failed (111: Connection refused) while connecting to upstream, client: 76.184.116.149, server: , request: "GET /favicon.ico HTTP/1.1", upstream: "http://172.17.0.2:4200/favicon.ico", host: "mapaddress-env-1.6fpdntwmhv.us-east-1.elasticbeanstalk.com"

