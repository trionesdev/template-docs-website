# 锁

为了避免并发导致的执行问题，提供了基于锁的解决方案，当前主要有线程锁和基于reids的分布式锁。单节点部署的时候用线程锁即可。

| 属性                | 说明                             | 默认值    |
|:------------------|:-------------------------------|:-------|
| triones.lock.type | 锁模式，thread 线程锁，redis，reids分布式锁 | thread |

使用方式

```javascript
@Lock(key = "'tenant-create'", waitTime = 1000, leaseTime = 10000)
public
void test()
{
    System.out.println("test start:" + LocalDateTime.now().toString());
    try {
        Thread.sleep(3000);
        System.out.println("test end:" + LocalDateTime.now().toString());
    } catch (InterruptedException
    e
)
    {
        throw new RuntimeException(e);
    }
}
```

注意： key的赋值是spel表达式，可以参考@Cacheable 的写法