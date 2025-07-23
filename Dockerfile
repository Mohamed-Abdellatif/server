# Step 1: Use Node base image
FROM node:20

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the code
COPY . .

# Step 5: Build the TypeScript code
RUN npm run build

# Step 6: Expose the port (just for docs, not actual binding)
EXPOSE 3001

# Step 7: Start the app
CMD ["node", "dist/index.js"]
