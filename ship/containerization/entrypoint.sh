#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  echo "Processing $file ...";

  sed -i 's|VUE_APP_NXP_EAAS_URL_VALUE|'${VUE_APP_NXP_EAAS_URL}'|g' $file
  sed -i 's|VUE_APP_NXP_TRACING_URL_VALUE|'${VUE_APP_NXP_TRACING_URL}'|g' $file
  sed -i 's|VUE_APP_KEYCLOAK_URL_VALUE|'${VUE_APP_KEYCLOAK_URL}'|g' $file
  sed -i 's|VUE_APP_KEYCLOAK_REALM_VALUE|'${VUE_APP_KEYCLOAK_REALM}'|g' $file
  sed -i 's|VUE_APP_KEYCLOAK_CLIENT_ID_VALUE|'${VUE_APP_KEYCLOAK_CLIENT_ID}'|g' $file

done

echo "Starting Nginx"
nginx -g 'daemon off;'
