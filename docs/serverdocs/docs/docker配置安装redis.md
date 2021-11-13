# docker 配置安装redis

## 镜像拉取

1. 执行下面命令，进行镜像拉取

   ```sh
   docker pull redis:6.2.6
   ```

2. 拉取完毕后，查看拉取镜像

   ```sh
   docker images
   ```

## 创建配置目录和数据目录

​		创建目录如下：

```sh
    #创建redis宿主机配置文件目录
    mkdir -p /sunhm3/workspace/redis/conf
    #创建redis宿主机配置文件
    mkdir /sunhm3/workspace/redis/conf/redis.conf
    #创建redis宿主机配置持久化数据目录
    mkdir -p /sunhm3/workspace/redis/data
```

## 启动redis容器

```sh
docker run \
--name redis \
-p 6397:6397 \
--restart unless-stopped \
-v /sunhm3/workspace/redis/data:/data \
-v /sunhm3/workspace/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis:6.2.6 \
redis-server /etc/redis/redis.conf
```

其中，`redis-server /etc/redis/redis.conf`的意思是redis启动时，将以该配置文件来启动。

![image-20211105223751843](/img/image-20211105223751843.png)

## 查看启动状态

```sh
#查看启动状态
docker ps
#查看启动日志
docker logs redis
```

如下图，则启动成功。

![image-20211105224008554](/img/image-20211105224008554.png)

## 检查是否可用

```sh
#进入到容器中
docker exec -it redis /bin/bash
#执行
redis-cli
>set name sunhm3
ok
>get name
"sunhm3"
```

![image-20211105224203495](/img/image-20211105224203495.png)

如此即可。