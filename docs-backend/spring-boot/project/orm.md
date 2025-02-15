# ORM

## mybatis-plus扩展

### JsonHandler

官方提供的JacksonTypeHandler 不支持泛型的处理，这里提供了几种扩展来处理

| handler                      | 说明                      |    |
|:-----------------------------|:------------------------|:---|
| BooleanCollectionTypeHandler | Boolean类型的集合            |    |
| StringCollectionTypeHandler  | String类型的集合             |    |
| IntegerCollectionTypeHandler | Integer类型的集合            |    |
| LongCollectionTypeHandler    | Long类型的集合               |    |
| FloatCollectionTypeHandler   | Float类型的集合              |    |
| DoubleCollectionTypeHandler  | Double类型的集合             |    |
| CollectionTypeHandler        | 集合类型，不能直接使用，需要实现一个继承类   |    |
| SpecificTypeHandler          | 特殊类型处理，不能直接使用，需要实现一个继承类 |    |

### 枚举映射

工程模板中已经配置了枚举的处理Typehandler,这样在枚举映射不到的时候，会返回null

```java
mybatis-plus:
  configuration:
    default-enum-type-handler: com.trionesdev.commons.mybatisplus.typehandlers.EnumTypeHandler
```

如果要求枚举必须匹配，可以去掉该配置，或者使用自己的实现。文档： [https://baomidou.com/guides/auto-convert-enum/](https://baomidou.com/guides/auto-convert-enum/)

### 分页

为了解决不同ORM之间分页对象的不同，导致在数据传输或者更换ORM的时候，需要更多工作去处理，我们提供了统一的 PageInfo 对象来封装。

``com.trionesdev.commons.core.page.PageInfo``

例如：mybatis-plus的Page对象，我们提供了 MpPageUtils 来将Page转换成 PageInfo对象

注：除了dao层之外的地方 都应该使用 ``com.trionesdev.commons.core.page.PageInfo`` 对分页对象进行包装，便于数据转换。
