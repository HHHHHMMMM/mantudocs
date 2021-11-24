# docker 部署mysql服务器

## docker pull下载镜像

```sh
docker pull mysql:8.0.26
```

![image-20211124103513988](/img/image-20211124103513988.png)

## 启动一个mysql容器

```sh
docker run -p 3306:3306 --name mantu-mysql -v /usr/local/workspace/mysql/conf:/etc/mysql -v /workspace/mysql/data:/var/lib/mysql -v /workspace/mysql/mysql-files:/var/lib/mysql-files/ -e MYSQL_ROOT_PASSWORD=xxxx -d mysql:8.0.26 --skip-name-resolve
```

启动参数说明：

1. `-p `:端口映射

2. `--name mantu-mysql`:容器名

3. `-v  /usr/local/workspace/mysql/conf:/etc/mysql`：mysql配置文件映射路径

4. `-v /workspace/mysql/data:/var/lib/mysql`:数据文件映射路径

5. `-v /workspace/mysql/mysql-files:/var/lib/mysql-files/`:其他文件映射路径

6. `-e MYSQL_ROOT_PASSWORD=xxxx`:root账户密码

7. `-d mysql:8.0.26 `:使用哪个镜像启动

8. `--skip-name-resolve:`跳过内部dns解析（mysql8.0+版本内部会有dns解析，导致外部连接时延迟甚至在20s以上）

   检查启动好的mysql容器

   ```sh
   docker ps
   ```

## 首次登陆使用自定义配置文件

### 首次登陆mysql容器

进入到容器中

```sh
docker exec -it <容器名> /bin/bash
```

容器中执行：

```sh
mysql -uroot -p
```

输入root密码即可登陆到mysql。

### 创建库及用户，并赋予权限（一般只赋予root用户创建库权限）

```sql
--创建库
create database xxxxx default charset utf8 collate utf8_general_ci;
--创建用户
create user '用户名'@'可登陆范围'  indentified by 'password'
--赋予用户权限
grant all privileges on 库名.* to '用户名'@'可登陆范围'
```

其中，可登陆范围，一般设置为`%`，则**默认任何ip都可以登陆**，生产环境这样配置是**非常不安全**的，但作为备库（开发库），可以免去外网ip变化之后无法登陆库。

### 跳过root验证（可选）

如下命令是跳过root验证，因为有些情况下，mysql容器会把root用户的改成一堆随机值。导致上面步骤无法通过root登陆进去。如果出现在容器内部，使用

`mysql -uroot -p`命令，输入密码无法登陆，且报用户名密码错误则需要执行本步骤。

1. 在宿主机的`/usr/local/workspace/mysql/conf`路径下创建`my.cnf`

​		内容为：

```conf
[mysqld]
skip-grant-tables
```

​	保存退出。

2. 再登陆到容器中，使用`mysql -uroot -p`，直接回车即可登陆进来，无需再输入密码。

   此时执行如下语句：

   ```sql
   user mysql;
   select user,authentication_string,host from user;
   update user set authentication_string='' where user='root';
   flush privileges;
   ```

   此时再把第一步的文件内容`skip-grant-tables`注释掉即可。

