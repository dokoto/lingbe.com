# Test de Manuel Alfaro Sierra para Lingbe.com
[PDF TEST](https://github.com/dokoto/lingbe.com/blob/master/docs/Programming%20Test.pdf)
## FRONTEND : HYBRID RSS READER

##### Installation
```bash
$> git clone https://github.com/dokoto/lingbe.com.git
$> cd lingbe.com
$> npm install
```

##### Build: Get help
```bash
$> grunt
```

##### Build: For web with debugging enabled
```bash
$> grunt --mode=dev --versionTablet=0.0.1 web
// Result in /builds/web/dev
```

##### Build: For native Android(by default) [Only API 16-25]. No signing
```bash
$> grunt --mode=prod --versionTablet=0.0.1 native
$> emulator -avd [AVD_NAME_API_BETWEEN_16_25]
$> adb install builds/native/lingbetest/platform/android/build/outputs/apk/xxx.apk
```

##### Build: For native IOS No signing [Tested only 9.3(too slow)]
```bash
$> grunt --mode=prod --os=ios --versionTablet=0.0.1 native
$> cd builds/native/lingbetest
$> ../../../../node_modules/cordova/bin/cordova run ios
```


## BACKEND : CONTACTS

##### CONFIGURATION
- Set mongodb url and port in src/services/ContactService/config/constants.json

##### RUN SERVICE
```bash
$> node run contactsserv
```

##### POST: api/v1/:book/:name
```bash
$> curl -k -X POST -H 'Content-Type: application/json' -d '{"phone":"914657387","mobile":"655542367", "email":"rosa@gmail.com"}' --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
```

##### GET: api/v1/:book/:name
```bash
$> curl -k --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
```

##### GET: api/v1/:book
```bash
$> curl -k --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco"
```

##### PUT: api/v1/:book/:name
```bash
$> curl -k -X PUT -H 'Content-Type: application/json' -d '{"phone":"9899999","mobile":"6888888", "email":"rosa.perez@gmail.com"}' --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
```

##### DELETE: api/v1/:book/:name
```bash
$> curl -k -X DELETE -H 'Content-Type: application/json' --user manuel:lingbe "https://127.0.0.1:8080/api/v1/contact/paco/Rosa"
```

#### NOTE
All bash commands were run on Ubuntu machine, in windows cmd could be different
