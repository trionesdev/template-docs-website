---
sidebar_position: 1
---

# 工程结构

模板工程中，默认有4个大模块

- infrastructure 基础设施层
- core 核心层(领域层+应用层)
- interfaces 用户接口层
    - rest-tenant 租户/企业后台接口
    - rest-boss 运营接口
- serve 服务入口

| 对象       | 名称               | 写法                     | 说明                                                                                                                  |
|:---------|:-----------------|:-----------------------|:--------------------------------------------------------------------------------------------------------------------|
| dto      | 数据传输对象           | XXXDTO,XXXCmd,XXXQuery | 用于返回值对象，或者跨领域传输对象                                                                                                   |
| entity   | 领域实体对象           | XXX                    | 领域实体对象(充血模型)，内部包含简单的业务逻辑                                                                                            |
| po       | 持久层对象            | XXXPO                  | 与数据库表，字段1-1映射                                                                                                       |
| ro       | 请求对象             | XXXRO                  | 用于接受请求端传的body对象，一般来说dto 就可以接收请求对象，考虑到数据验证，swagger展示等情况，单独用ro对象来接收，例如，ArticleCreateRO,ArticleUpdateRO,ArticleQueryRO |
| vo       | 视图对象             | XXXVO                  | 用于返回值                                                                                                               |
| criteria | 条件对象             | xxxCriteria            | 用封装给ORM的查询参数                                                                                                        |



这里主要介绍dto，entity，po，ro,vo,query,criteria这几个对象概念

- dto  (Data Transfer Object) 数据传输对象
- entity 领域实体对象
- po （Persistent Object）持久层对象
- ro (Request Object) 请求对象
- vo (View Object) 视图对象
- criteria 条件对象

> 原则上来说 只有vo 或者 dto 可以作为返回值对象，从减少工作量的角度，我们放宽约束，如果是表级查询可以直接返回po。entity
> 不能作为返回对象，因为entity 不是单纯的数据模型，里面还有业务逻辑。