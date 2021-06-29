module.exports = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: "1b739954094148139794c0d4c6aa2b2053d4ad34",
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,"\n"),
  client_email:  process.env.FIREBASE_CLIENT_EMAIL,
  client_id: "106655273995743242515",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-djxst%40fitware-ebcde.iam.gserviceaccount.com",
};
