# 使用官方 Node.js 运行环境
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装 cnpm
RUN npm install -g cnpm --registry=https://registry.npmmirror.com

# 复制 package.json 和 package-lock.json 或 yarn.lock
COPY package*.json ./

# 使用 cnpm 安装依赖
RUN cnpm install

# 复制应用代码
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 暴露应用运行端口
EXPOSE 3000

# 定义运行应用的命令
CMD ["npm", "start"]