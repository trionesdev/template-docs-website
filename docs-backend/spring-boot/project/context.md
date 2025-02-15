# 请求上下文

token解析成功之后，会将token中的内容放在ActorConext中，在业务中需要获取当前执行人信息，只需要注入ActorContex。

```java
@RequiredArgsConstructor
@Service
public class UserService {
    private final ActorContext actorContext;
    private final UserDAO userDAO;

    public User findCurrentUser(){
      String UserId = actorContext.getUserId();
      return userDAO.getById(userId);
    }
  
}
```

ActorContext属性说明

| 属性             | 说明                   | 数据类型                |
|:---------------|:---------------------|:--------------------|
| actorId        | 执行人ID，根据实际设置为准       |                     |
| userId         | 用户ID                 | String              |
| role           | 角色：主要区分用户，租户用户，运营人员等 | String              |
| tenantId       | 租户ID                 | String              |
| tenantMemberId | 租户成员ID               | String              |
| attributes     | 属性，一些额外的信息           | Map\<String,Object> |

