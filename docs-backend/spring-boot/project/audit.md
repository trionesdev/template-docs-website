# 操作审计/行为日志

在一些场景下，我们会需要对用户的操作行为进行记录。这块我们提供了相应的注解实现该功能。

定义一个默认操作处理类（默认处理类只能有一个）

```java
package com.trionesdev.wms.core.domains.log.internal;


import com.trionesdev.commons.core.util.JsonUtils;
import com.trionesdev.spring.core.audit.OperationAuditContext;
import com.trionesdev.spring.core.audit.OperationAuditHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class DefaultOperationHandler extends OperationAuditHandler {

    @Override
    public Boolean isDefault() {
        return true;
    }

    @Override
    public void process(OperationAuditContext operationAuditContext) {
        System.out.println(JsonUtils.toJsonString(operationAuditContext));
    }
}

```

使用方法

```java
@OperationAudit(type = "QUERY", action = "SIGN-IN", description = "账号登录")
```

如果需要对某些场景进行单独处理，可以指定Handler

```java
@OperationAudit(type = "QUERY", action = "SIGN-IN", description = "账号登录",handler = DefaultOperationHandler.class)
```

