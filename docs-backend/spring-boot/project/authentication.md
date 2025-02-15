---
sidebar_position: 2
---
# 登录鉴权

> 默认基于jwt进行鉴权，

### jwt属性配置

| 属性                              | 说明      | 默认值                               |
|:--------------------------------|:--------|:----------------------------------|
| triones.security.jwt.secret     | 秘钥      | secret1234567890qwertyuiopasdfghg |
| triones.security.jwt.expiration | 过期时间(秒) |                                   |

### 使用方法

通过注入 com.trionesdev.commons.core.jwt.JwtFacade 来生成Token。

```java
@RequiredArgsConstructor
@Service
public class Account{
  private final JwtFacade jwtFacade;

  public String token(){
    return jwtFacade.generate("1");//生成一个userId为1，role为USER的token
  }
  
}
```

JwtFacade 可以将用户ID，角色，租户ID 一起带入token中。此处的userId是作为主要流转，根据实际情况设置即可。

```java
jwtFacade.generate("userid", JwtClaims.builder().tenantId("tenantId").role("USER").tenantId("tennatId").tenantMemberId("tenantMemberId").build())
```

### 忽略配置

对于不需要鉴权的路径，我们可以在配置文件中进行排除

| 属性                                       | 说明                | 默认值 |
|:-----------------------------------------|:------------------|:----|
| triones.security.ignore-matchers         | 忽略的路由，例如静态文件等     |     |
| triones.security.exclude-matchers        | 排除的路由,包括对应的各种方法路由 |     |
| triones.security.exclude-get-matchers    | 排除的get路由          |     |
| triones.security.exclude-post-matchers   | 排除的post路由         |     |
| triones.security.exclude-put-matchers    | 排除的put路由          |     |
| triones.security.exclude-delete-matchers | 排除的delete路由       |     |

### 前端使用

将token 放入 key为 Authorization 或者Bearer Authorization的Header中