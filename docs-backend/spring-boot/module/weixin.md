# 微信开放平台集成

## 添加版本管理

```java
<dependency>
    <groupId>com.trionesdev.weixin</groupId>
    <artifactId>triones-weixin-spring-boot-starters</artifactId>
    <version>3.0-SNAPSHOT</version>
    <type>pom</type>
    <scope>import</scope>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
        </exclusion>
    </exclusions>
</dependency> 
```

## 微信小程序

地址： [https://github.com/trionesdev/triones-weixin-spring-boot-starters/tree/develop/triones-weixin-miniprogram-spring-boot-starter](https://github.com/trionesdev/triones-weixin-spring-boot-starters/tree/develop/triones-weixin-miniprogram-spring-boot-starter)

### 添加依赖

```java
<dependency>
    <groupId>com.trionesdev.weixin</groupId>
    <artifactId>triones-weixin-miniprogram-spring-boot-starter</artifactId>
</dependency>
```

### 配置文件

| 属性                                 | 说明                                          | 默认值   |
|:-----------------------------------|:--------------------------------------------|:------|
| triones.weixin.miniprogram.enabled | 是否启用微信小程序                                   | false |
| triones.weixin.miniprogram.app-id  |                                             |       |
| triones.weixin.miniprogram.secret  |                                             |       |
| triones.weixin.miniprogram.cache   | 缓存实现类，如果工程中只有一个缓存处理，也可以不填默认使用WeXinCache的实现类 |       |

### 缓存使用

实现 ``com.trionesdev.weixin.base.WeiXinCache`` 接口，可以自己实现缓存处理方案

#### 范例

```java
@RequiredArgsConstructor
@Component
public class RedisWeiXinCache implements WeiXinCache {
    private final RedisTemplate<String, String> redisTemplate;

    @Nullable
    @Override
    public String getAccessToken(@Nullable String s) {
        return redisTemplate.opsForValue().get("wx:access_token:" + s);
    }

    @Override
    public void setAccessToken(@Nullable String appId, @Nullable String token, @Nullable Long expiresIn) {
        redisTemplate.opsForValue().set("wx:access_token:" + appId, token, Duration.ofSeconds(expiresIn));
    }

    @Nullable
    @Override
    public String getSnsAccessToken(@Nullable String s) {
        return redisTemplate.opsForValue().get("wx:sns_access_token:" + s);
    }

    @Override
    public void setSnsAccessToken(@Nullable String s, @NotNull String s1,@Nullable Long expiresIn) {
        redisTemplate.opsForValue().set("wx:sns_access_token:" + s, s1);
    }

    @Nullable
    @Override
    public String getJsapiTicket(@Nullable String s) {
        return redisTemplate.opsForValue().get("wx:jsapi_ticket:" + s);
    }

    @Override
    public void setJsapiTicket(@Nullable String s, @NotNull String s1) {
        redisTemplate.opsForValue().set("wx:jsapi_ticket:" + s, s1);
    }


}
```

#### 添加配置

```java
triones.weixin.miniprogram.cache=com.trionesdev.infrastructure.cloud.weixin.RedisWeiXinCache
```

