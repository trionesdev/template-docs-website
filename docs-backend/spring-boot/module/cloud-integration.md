# 云服务集成

>
由于云服务厂商提供的服务很多功能类似，但是由于厂商不同，sdk也各有不同，并且还有开发时使用minio作为存储这种情况。为了满足不同厂商服务之间的切换，以及不同环境之间的切换，无需修改代码，我们提供了统一的接口，只需要引入对应的包即可。详情可以查看源码

[Github](https://github.com/trionesdev/triones-cloud-integration-spring-boot-starters)

## 添加版本管理

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-cloud-integration-spring-boot-starters</artifactId>
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

下面以阿里云为例

## 阿里云

### oss 对象存储

#### 添加依赖

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-csi-aliyun-oss-spring-boot-starter</artifactId>
</dependency>
```

#### 单个实例添加

##### 配置说明

| 属性                                   | 说明                | 默认值   |
|:-------------------------------------|:------------------|:------|
| triones.aliyun.oss.enabled           | 是否开启阿里云OSS        | false |
| triones.aliyun.oss.access-key-id     | access-key-id     |       |
| triones.aliyun.oss.access-key-secret | access-key-secret |       |
| triones.aliyun.oss.bucket            | 桶名                |       |
| triones.aliyun.oss.endpoint          | 端点，根据官方的可用区进行配置   |       |
| triones.aliyun.oss.url-prefix        | url前缀，用于拼接        |       |

代码

在core模块中，``provider.cloud package`` 中，添加oss package ，创建OssProvider文件

```java
import com.trionesdev.csi.api.oss.OssTemplate;
import com.trionesdev.csi.api.oss.request.OssPutObjectRequest;
import lombok.RequiredArgsConstructor;
import ms.dubhe.foundation.core.provider.cloud.oss.pdo.PutObjectArgPDO;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OssProvider {
    private final OssTemplate ossTemplate; //自动注入 oss的实现类

    public String putObject(PutObjectArgPDO arg){
        OssPutObjectRequest ossPutObjectRequest = OssPutObjectRequest.builder().objectName(arg.getObjectName())
                .inputStream(arg.getInputStream()).build();
       return ossTemplate.putObject(ossPutObjectRequest).getUrl();
    }

}
```

### sms 短信服务

添加依赖

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-csi-aliyun-sms-spring-boot-starter</artifactId>
</dependency>
```

单个实例添加

配置说明

| 属性                                   | 说明                | 默认值   |
|:-------------------------------------|:------------------|:------|
| triones.aliyun.sms.enabled           | 开启阿里云短信服务         | fasle |
| triones.aliyun.sms.access-key-id     | access-key-id     |       |
| triones.aliyun.sms.access-key-secret | access-key-secret |       |
| triones.aliyun.sms.region-id         | 区域ID              |       |
| triones.aliyun.sms.sign-name         | 签名                |       |
| triones.aliyun.sms.template-codes    | 模板code，           |       |

代码

在core模块中，provider.cloud package 中，添加sms package ，创建SmsProvider文件

有的厂商消息模板用占位符 有的用参数索引，所以这里统一装配成SmsVariable

```java
public class SmsVariable {
    private String key;
    private String value;
    private Integer index;
}



import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.map.MapUtil;
import com.trionesdev.csi.api.sms.SmsTemplate;
import com.trionesdev.csi.api.sms.SmsVariable;
import com.trionesdev.csi.api.sms.request.SmsSendRequest;
import com.trionesdev.bysp.core.facade.cloud.sms.dto.SendSmsCmd;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

@RequiredArgsConstructor
@Component
public class SmsFacade {
    private final SmsTemplate smsTemplate;

    public void sendSms(SendSmsCmd sendSmsCmd) {
        List<SmsVariable> smsParams = CollectionUtil.newArrayList();
        if (MapUtil.isNotEmpty(sendSmsCmd.getParams())) {
            List<Entry<String, String>> entries = new ArrayList<>(sendSmsCmd.getParams().entrySet());
            for (int i = 0; i < entries.size(); i++) {
                smsParams.add(SmsVariable.builder().key(entries.get(i).getKey()).value(entries.get(i).getValue()).index(i).build());
            }
        }
        SmsSendRequest sendRequest = SmsSendRequest.builder().templateCode(smsTemplate.template(sendSmsCmd.getTemplateCode())).phoneNumbers(sendSmsCmd.getPhone()).variables(smsParams).build();
        smsTemplate.send(sendRequest);
    }
}
```

## 腾讯云

### oss 对象存储

添加依赖

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-csi-tencentcloud-cos-spring-boot-starter</artifactId>
</dependency>
```

具体用法，见阿里云OSS

### sms 短信服务

添加依赖

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-csi-tencentcloud-sms-spring-boot-starter</artifactId>
</dependency>
```

## 华为云

### obs 对象存储

添加依赖

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-csi-huaweicloud-obs-spring-boot-starter</artifactId>
</dependency>
```

### sms 短信服务

添加依赖

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-csi-huaweicloud-sms-spring-boot-starter</artifactId>
</dependency>
```

## 七牛云

### kudo 对象存储

添加依赖

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-csi-qiniu-kudo-spring-boot-starter</artifactId>
</dependency>
```

## 微软云

### blob 对象存储

添加依赖

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-csi-azure-blob-spring-boot-starter</artifactId>
</dependency>
```

## 自部署

### minio对象存储

添加依赖

```java
<dependency>
    <groupId>com.trionesdev.csi</groupId>
    <artifactId>triones-csi-minio-spring-boot-starter</artifactId>
</dependency>
```

