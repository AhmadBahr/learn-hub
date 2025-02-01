# Use the AWS Lambda Node.js 20 base image for the build stage
FROM public.ecr.aws/lambda/nodejs:20 AS build

# Set the working directory for the app
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies (including dev dependencies for building)
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Build TypeScript files
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Use a second stage to prepare the production image
FROM public.ecr.aws/lambda/nodejs:20

# Set the working directory for the Lambda function code
WORKDIR ${LAMBDA_TASK_ROOT}

# Copy built JavaScript files and node_modules from the build stage
COPY --from=build /app/dist ${LAMBDA_TASK_ROOT}
COPY --from=build /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules

# Copy package.json (optional, for other runtime purposes)
COPY --from=build /app/package*.json ${LAMBDA_TASK_ROOT}

# Copy DynamoDB Local JAR and associated files (Make sure these are included in your repo)
COPY ./dynamodb-local /app/dynamodb-local

# Set the library path for DynamoDB Local
ENV JAVA_LIBRARY_PATH=/app/dynamodb-local/DynamoDBLocal_lib

# Expose the port that DynamoDB Local will use (default: 8000)
EXPOSE 8000

# Set environment variables for the Lambda function
ENV NODE_ENV=production

# Command to start DynamoDB Local
CMD java -Djava.library.path=/app/dynamodb-local/DynamoDBLocal_lib -jar /app/dynamodb-local/DynamoDBLocal.jar -sharedDb -dbPath /app/dynamodb-local/run & \
    node index.handler
