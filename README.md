## Uputstvo za buildanje aplikacije

1. Npm install u glavnom folderu - za instaliranje potrebnih paketa

```bash
npm instasll
```

2. Ulazak u android folder

```bash
cd android
```

3. Ciscenje gradle-a

```bash
./gradlew clean
```

4. Buildanje apk-a

```bash
./gradlew assembleRelease
```

5. Vas apk bi se trebao nalaziti na sljedecom path-u
   \android\app\build\outputs\apk\release\app-release.apk
