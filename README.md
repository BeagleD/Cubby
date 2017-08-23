<img src="https://travis-ci.com/LucasBassetti/sharetempus-api.svg?token=CTyV7Ewf9xMPK3SPA9BL&branch=master"/>

# Sharetempus API

### Deploy

1. run `npm run build`
2. run `npm run deploy`
3. run `ssh root@159.203.111.127`
4. go to `/home/api/` api folder
5. run `tar -xvzf api.tar.gz`
6. run `npm install`
7. run `npm run forever`

### Service

Rename the `unix_service` to `api` and add it in folder `etc/init.d`

##### Add service as default

- go to `etc/init.d`
- chmod a+x api
- update-rc.d api defaults

##### Usage

- service api {start|stop|restart|status}
