//STEP 1 USE WINGET TOOL TO INSTALL AZURE CLI
winget install --exact --id Microsoft.AzureCLI


// STEP 2 CHECK THAT AZURE CLI INSTALLED
az --version

// STEP3 LOGIN USING MULTIFACTOR AUTHENTICATION
az login --use-device-code

// STEP 4 GO THE WEBSITE URL AND PASTE THE LOGIN CODE
https://login.microsoft.com/device
C3KP9SFFB

// STEP 5 PRESS ENTER WHEN AZURE ASKS YOU FOR SUBSCRIPTION

// 🚀 STEP 6: CREATE RESOURCE GROUP
az login
az group create --name microservices-rg --location eastus
az group create --name node-microservices-rg --location eastus

// STEP 7 Create Container App Environment
az containerapp env create \
  --name microservices-env \
  --resource-group microservices-rg \
  --location eastus

az containerapp env create \
  --name node-microservices-env \
  --resource-group node-microservices-rg \
  --location eastus

// STEP 8 CREATE CUSTOMER CONTAINER  
az containerapp create \
  --name customer-service \
  --resource-group microservices-rg \
  --environment node-microservices-env \
  --image tsola2002/node-customer-service:latest \
  --target-port 8080 \
  --env-vars ORDER_SERVICE_URL=http://order-service:8081   

az containerapp create \
  --name node-customer-service \
  --resource-group node-microservices-rg \
  --environment node-microservices-env \
  --image tsola2002/node-customer-service:latest \
  --target-port 8080 \
  --env-vars ORDER_SERVICE_URL=http://order-service:8081


// STEP 9 CREATE ORDER CONTAINER
az containerapp create \
  --name order-service \
  --resource-group microservices-rg \
  --environment microservices-env \
  --image tsola2002/node-order-service:latest \
  --target-port 8081 \
  --ingress external

  az containerapp create \
  --name node-order-service \
  --resource-group node-microservices-rg \
  --environment node-microservices-env \
  --image tsola2002/node-order-service:latest \
  --target-port 8081 \
  --ingress external

// STEP 10 CREATE REACT CONTAINER 
az containerapp create \
  --name react-frontend \
  --resource-group microservices-rg \
  --environment microservices-env \
  --image tsola2002/node-frontend:latest \
  --target-port 80 \
  --ingress external

az containerapp create \
  --name node-react-frontend \
  --resource-group node-microservices-rg \
  --environment node-microservices-env \
  --image tsola2002/node-frontend:latest \
  --target-port 80 \
  --ingress external

// STEP 11 Step 4: Setup PostgreSQL
Go to Azure Portal
Create → Azure Database for PostgreSQL
Set:
DB name: customerdb
user: postgres
password: postgres