# 异常处理
> 为了满足异常信息的国际化，将异常信息定义在Resource Bundle文件中。

### 错误类型

| 异常类型                      | 说明     |
|:--------------------------|:-------|
| TrionesException          | 基础异常类型 |
| BusinessException         | 业务异常   |
| NotFoundException         | 未找到异常  |
| PermissionDeniedException | 无权限异常  |
| ValidationException       | 验证异常   |
| InternalRequestException  | 内部请求异常 |

### 属性

| 属性                               | 说明          |    |
|:---------------------------------|:------------|:---|
| triones.exception.resource-paths | 文件路径，可以配置多个 |    |

### 配置文件路径

```java
triones.exception.resource-paths=i18n/error
```

### 在i18n/error文件中定义错误码

```java
USER_NOT_FOUND=用户不存在
```

### 抛出异常

```java
throw new NotFoundException("USER_NOT_FOUND");
```

### 代码定义异常
如果不考虑国际化也不想在配置文件中写，可以使用 com.trionesdev.commons.exception.TrionesError ,使用如下

```java
TrionesError error = TrionesError.builder().code("USER_NOT_FOUND").message("用户不存在").build();
throw new BusinessException(error);
```

