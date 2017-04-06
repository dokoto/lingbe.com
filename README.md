# Test de Manuel Alfaro Sierra para Lingbe.com
[PDF TEST](https://github.com/dokoto/lingbe.com/blob/master/docs/Programming%20Test.pdf)
## FRONTEND : HYBRID RSS READER

##### Installation
```
$> git clone https://github.com/dokoto/lingbe.com.git
$> cd lingbe.com
$> npm install
```

##### Build: Get help
```
$> grunt
```

##### Build: For web with debugging enabled
```
$> grunt --mode=dev --versionTablet=0.0.1 web
// Result in /builds/web/dev
```

##### Build: For native Android(by default) [Only API 16-25]. No signing
```
$> grunt --mode=prod --versionTablet=0.0.1 native
$> emulator -avd [AVD_NAME_API_BETWEEN_16_25]
$> adb install builds/native/lingbetest/platform/android/build/outputs/apk/xxx.apk
```

##### Build: For native IOS No signing [Tested only 9.3(too slow)]
```
$> grunt --mode=prod --os=ios --versionTablet=0.0.1 native
$> cd builds/native/lingbetest
$> ../../../../node_modules/cordova/bin/cordova run ios
```
