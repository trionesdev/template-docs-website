# 支付集成

## 添加依赖管理

```java
<dependency>
    <groupId>com.trionesdev.payment</groupId>
    <artifactId>triones-payment-spring-boot-starters</artifactId>
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

## 微信支付

### 添加依赖

```java
<dependency>
    <groupId>com.trionesdev.payment</groupId>
    <artifactId>triones-wxpay-spring-boot-starter</artifactId>
</dependency>
```

### 配置说明

| 属性                                            | 说明                            | 默认值   |
|:----------------------------------------------|:------------------------------|:------|
| triones.payment.wxpay.enabled                 | 是否启用微信支付                      | false |
| triones.payment.wxpay.app-id                  | 关联的appid                      |       |
| triones.payment.wxpay.mch-id                  | 商户ID                          |       |
| triones.payment.wxpay.api-v3-key              | apiV3Key                      |       |
| triones.payment.wxpay.private-key             | 证书私钥内容                        |       |
| triones.payment.wxpay.private-cert            | 证书内容                          |       |
| triones.payment.wxpay.private-key-base64      | base64编码后的证书私钥内容              |       |
| triones.payment.wxpay.private-cert-base64     | base64编码后的证书内容                |       |
| triones.payment.wxpay.private-key-path        | 证书私钥地址                        |       |
| triones.payment.wxpay.private-cert-path       | 证书地址                          |       |
| triones.payment.wxpay.transaction-notify-url  | 交易回调地址                        |       |
| triones.payment.wxpay.refund-notify-url       | 退款回调地址                        |       |
| triones.payment.wxpay.transaction-notify-urls | 交易回调地址，如果需要不同业务配置回调地址，可以通过此方式 |       |
| triones.payment.wxpay.refund-notify-urls      | 退款回调地址，如果需要不同业务配置回调地址，可以通过此方式 |       |

### 使用

微信支付的主要分为jsapi,app,native,h5几个方式，我们在使用的时候，根据场景选择对应的实例进行操作即可。

注入 ``com.trionesdev.payment.wxpay.v3.WxPayTemplate``

```java
public interface WxPayTemplate {
    //用于获取triones.payment.wxpay.transaction-notify-urls 配置的回调地址
    String transactionNotifyUrl(String var1);
    //用于获取triones.payment.wxpay.refund-notify-urls 配置的回调地址
    String refundNotifyUrl(String var1);
    //获取H5实例
    WxPayH5 getH5();
    //获取JSAPI实例
    WxPayJsApi getJsApi();
    //获取Native实例
    WxPayNative getNative();
    //获取App实例
    WxPayApp getApp();
    //交易回调
    WxPayTransactionNotifyResponse transactionNotify(WxPayNotifyRequest var1);
    //退款回调
    WxPayRefoundNotifyResponse refundNotify(WxPayNotifyRequest var1);
}
```

