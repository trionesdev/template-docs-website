# restful版本控制

在客户端场景下，由于终端更新的问题，我们会需要通过接口版本的方式来确保接口与客户端的版本匹配。我们提供了
基于路径的版本控制和基于头信息的版本控制两种方式。

| 属性                                          | 说明                         | 默认值       |
|:--------------------------------------------|:---------------------------|:----------|
| triones.web.api-version.type                | 版本类型 ，path:路径，header:请求头信息 | null      |
| triones.web.api-version.path.version-name   | 版本变量的名称，type设置为path时有效     | version   |
| triones.web.api-version.header.version-name | 版本变量的名称，type设置为header时有效   | X-Version |

## 使用方法

### 基于路径

```java
@RestController
@RequestMapping("api/{version}/test")
public class PathTestController {
    
    @GetMapping
    public String test(){
        return "test";
    }

    @PathApiVersion("v1")
    @GetMapping
    public String testV1(){
        return "testV1";
    }

    @PathApiVersion("v2")
    @GetMapping
    public String testV2(){
        return "testV2";
    }

}
```

### 基于头信息

```java
@RestController
@RequestMapping("api/test")
public class HeaderTestController {

    @GetMapping
    public String test(){
        return "test";
    }

    @HeaderApiVersion("v1")
    @GetMapping
    public String testV1(){
        return "testV1";
    }

    @HeaderApiVersion("v2")
    @GetMapping
    public String testV2(){
        return "testV2";
    }

}
```

