# توثيق التكامل مع البنوك والمحافظ الإلكترونية اليمنية

## نظرة عامة

يوفر هذا المستند المعلومات التقنية اللازمة للتكامل مع البنوك اليمنية والمحافظ الإلكترونية المحلية في منصة الخدمات المستقلة اليمنية. يهدف هذا التكامل إلى توفير تجربة دفع سلسة وآمنة للمستخدمين.

## البنوك المدعومة

### 1. البنك اليمني الدولي (IBY)

#### 1.1 معلومات التكامل

- **نوع التكامل**: واجهة برمجة التطبيقات (API)
- **بروتوكول الاتصال**: HTTPS
- **طريقة المصادقة**: OAuth 2.0
- **تنسيق البيانات**: JSON
- **رابط الواجهة البرمجية**: `https://api.ibyemen.com/v1/`
- **بيئة الاختبار**: `https://sandbox.ibyemen.com/v1/`

#### 1.2 خطوات التكامل

1. التسجيل كمطور في بوابة المطورين للبنك
2. إنشاء تطبيق جديد والحصول على مفاتيح API
3. تكوين إعدادات إعادة التوجيه والإشعارات
4. اختبار التكامل في بيئة الاختبار
5. طلب الترخيص للإنتاج

#### 1.3 نماذج الطلبات

##### إنشاء معاملة دفع

```json
POST /transactions
Content-Type: application/json
Authorization: Bearer {ACCESS_TOKEN}

{
  "amount": 100000,
  "currency": "YER",
  "description": "دفع مقابل خدمة تصميم شعار",
  "customer_id": "CUST123456",
  "callback_url": "https://yemenfreelance.com/payment/callback",
  "metadata": {
    "order_id": "ORD123456",
    "service_id": "SRV789012"
  }
}
```

##### استعلام عن حالة المعاملة

```json
GET /transactions/{TRANSACTION_ID}
Authorization: Bearer {ACCESS_TOKEN}
```

### 2. بنك اليمن والكويت (YKB)

#### 2.1 معلومات التكامل

- **نوع التكامل**: واجهة برمجة التطبيقات (API)
- **بروتوكول الاتصال**: HTTPS
- **طريقة المصادقة**: API Key + HMAC
- **تنسيق البيانات**: XML
- **رابط الواجهة البرمجية**: `https://api.ykbbank.com/services/`
- **بيئة الاختبار**: `https://test.ykbbank.com/services/`

#### 2.2 خطوات التكامل

1. التقدم بطلب للحصول على حساب مطور
2. توقيع اتفاقية التكامل
3. الحصول على مفاتيح API ومعلومات المصادقة
4. تنفيذ التكامل واختباره
5. الحصول على موافقة للإطلاق

#### 2.3 نماذج الطلبات

##### إنشاء معاملة دفع

```xml
POST /payment/create
Content-Type: application/xml
API-Key: {API_KEY}
Signature: {HMAC_SIGNATURE}

<PaymentRequest>
  <Amount>100000</Amount>
  <Currency>YER</Currency>
  <Description>دفع مقابل خدمة تصميم شعار</Description>
  <CustomerID>CUST123456</CustomerID>
  <CallbackURL>https://yemenfreelance.com/payment/callback</CallbackURL>
  <Metadata>
    <OrderID>ORD123456</OrderID>
    <ServiceID>SRV789012</ServiceID>
  </Metadata>
</PaymentRequest>
```

### 3. البنك الأهلي اليمني (NYB)

#### 3.1 معلومات التكامل

- **نوع التكامل**: نموذج ويب مضمن
- **بروتوكول الاتصال**: HTTPS
- **طريقة المصادقة**: معرف التاجر + المفتاح السري
- **رابط النموذج**: `https://payment.nbyemen.com/checkout/`
- **بيئة الاختبار**: `https://test.nbyemen.com/checkout/`

#### 3.2 خطوات التكامل

1. فتح حساب تاجر لدى البنك
2. الحصول على معرف التاجر والمفتاح السري
3. تكوين صفحة إعادة التوجيه والإشعارات
4. تضمين النموذج في صفحة الدفع

#### 3.3 مثال التكامل

```html
<form action="https://payment.nbyemen.com/checkout/" method="POST">
  <input type="hidden" name="merchant_id" value="{MERCHANT_ID}">
  <input type="hidden" name="amount" value="100000">
  <input type="hidden" name="currency" value="YER">
  <input type="hidden" name="order_id" value="ORD123456">
  <input type="hidden" name="description" value="دفع مقابل خدمة تصميم شعار">
  <input type="hidden" name="return_url" value="https://yemenfreelance.com/payment/success">
  <input type="hidden" name="cancel_url" value="https://yemenfreelance.com/payment/cancel">
  <input type="hidden" name="notify_url" value="https://yemenfreelance.com/payment/notify">
  <input type="hidden" name="signature" value="{CALCULATED_SIGNATURE}">
  <button type="submit">الدفع الآن</button>
</form>
```

### 4. كاك بنك (CAC Bank)

#### 4.1 معلومات التكامل

- **نوع التكامل**: واجهة برمجة التطبيقات (API) + SDK
- **بروتوكول الاتصال**: HTTPS
- **طريقة المصادقة**: JWT
- **تنسيق البيانات**: JSON
- **رابط الواجهة البرمجية**: `https://api.cacbank.com/ecommerce/`
- **بيئة الاختبار**: `https://sandbox.cacbank.com/ecommerce/`
- **SDK المتاحة**: Android, iOS, JavaScript

#### 4.2 خطوات التكامل

1. التسجيل في بوابة المطورين
2. إنشاء مشروع جديد والحصول على بيانات الاعتماد
3. تنزيل وتكوين SDK المناسب
4. اختبار التكامل في بيئة الاختبار
5. طلب الانتقال إلى الإنتاج

#### 4.3 نماذج الطلبات

##### إنشاء معاملة دفع

```json
POST /payments
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN}

{
  "amount": 100000,
  "currency": "YER",
  "description": "دفع مقابل خدمة تصميم شعار",
  "customer": {
    "id": "CUST123456",
    "email": "customer@example.com",
    "phone": "967712345678"
  },
  "redirect": {
    "success_url": "https://yemenfreelance.com/payment/success",
    "cancel_url": "https://yemenfreelance.com/payment/cancel"
  },
  "webhook_url": "https://yemenfreelance.com/payment/webhook",
  "metadata": {
    "order_id": "ORD123456",
    "service_id": "SRV789012"
  }
}
```

## المحافظ الإلكترونية المدعومة

### 1. محفظة موبايل موني (Mobile Money)

#### 1.1 معلومات التكامل

- **نوع التكامل**: واجهة برمجة التطبيقات (API)
- **بروتوكول الاتصال**: HTTPS
- **طريقة المصادقة**: API Key
- **تنسيق البيانات**: JSON
- **رابط الواجهة البرمجية**: `https://api.mobilemoney.com.ye/v2/`
- **بيئة الاختبار**: `https://sandbox.mobilemoney.com.ye/v2/`

#### 1.2 خطوات التكامل

1. التسجيل كشريك تجاري
2. الحصول على مفتاح API
3. تكوين إعدادات الإشعارات
4. اختبار التكامل
5. الانتقال إلى الإنتاج

#### 1.3 نماذج الطلبات

##### إنشاء طلب دفع

```json
POST /payment/request
Content-Type: application/json
API-Key: {API_KEY}

{
  "amount": 100000,
  "phone": "967712345678",
  "description": "دفع مقابل خدمة تصميم شعار",
  "reference": "ORD123456",
  "callback_url": "https://yemenfreelance.com/payment/callback"
}
```

##### التحقق من حالة الدفع

```json
GET /payment/status/{PAYMENT_ID}
API-Key: {API_KEY}
```

### 2. فلوسك موبايل (Floosk Mobile)

#### 2.1 معلومات التكامل

- **نوع التكامل**: واجهة برمجة التطبيقات (API) + SDK
- **بروتوكول الاتصال**: HTTPS
- **طريقة المصادقة**: OAuth 2.0
- **تنسيق البيانات**: JSON
- **رابط الواجهة البرمجية**: `https://api.floosk.ye/merchant/`
- **بيئة الاختبار**: `https://sandbox.floosk.ye/merchant/`
- **SDK المتاحة**: Android, iOS, JavaScript

#### 2.2 خطوات التكامل

1. التسجيل في بوابة المطورين
2. إنشاء تطبيق جديد والحصول على بيانات الاعتماد
3. تنزيل وتكوين SDK المناسب
4. اختبار التكامل
5. طلب الانتقال إلى الإنتاج

#### 2.3 نماذج الطلبات

##### إنشاء معاملة دفع

```json
POST /transactions
Content-Type: application/json
Authorization: Bearer {ACCESS_TOKEN}

{
  "amount": 100000,
  "description": "دفع مقابل خدمة تصميم شعار",
  "customer_phone": "967712345678",
  "reference_id": "ORD123456",
  "callback_url": "https://yemenfreelance.com/payment/callback",
  "metadata": {
    "service_id": "SRV789012"
  }
}
```

### 3. محفظة يمن موبايل (Yemen Mobile Wallet)

#### 3.1 معلومات التكامل

- **نوع التكامل**: واجهة برمجة التطبيقات (API)
- **بروتوكول الاتصال**: HTTPS
- **طريقة المصادقة**: API Key + Secret
- **تنسيق البيانات**: JSON
- **رابط الواجهة البرمجية**: `https://api.ymwallet.ye/api/`
- **بيئة الاختبار**: `https://test.ymwallet.ye/api/`

#### 3.2 خطوات التكامل

1. التقدم بطلب للحصول على حساب تاجر
2. الحصول على مفتاح API والرمز السري
3. تكوين إعدادات الإشعارات
4. اختبار التكامل
5. الانتقال إلى الإنتاج

#### 3.3 نماذج الطلبات

##### إنشاء طلب دفع

```json
POST /merchant/payment
Content-Type: application/json
API-Key: {API_KEY}
API-Secret: {API_SECRET}
Timestamp: {UNIX_TIMESTAMP}

{
  "amount": 100000,
  "phone": "967712345678",
  "description": "دفع مقابل خدمة تصميم شعار",
  "order_id": "ORD123456",
  "notification_url": "https://yemenfreelance.com/payment/notification",
  "return_url": "https://yemenfreelance.com/payment/return"
}
```

### 4. محفظة MTN (MTN Mobile Money)

#### 4.1 معلومات التكامل

- **نوع التكامل**: واجهة برمجة التطبيقات (API)
- **بروتوكول الاتصال**: HTTPS
- **طريقة المصادقة**: API Key + Signature
- **تنسيق البيانات**: JSON
- **رابط الواجهة البرمجية**: `https://api.mtn.ye/collection/`
- **بيئة الاختبار**: `https://sandbox.mtn.ye/collection/`

#### 4.2 خطوات التكامل

1. التسجيل كشريك تجاري
2. الحصول على مفتاح API ومفتاح التوقيع
3. تكوين إعدادات الإشعارات
4. اختبار التكامل
5. الانتقال إلى الإنتاج

#### 4.3 نماذج الطلبات

##### إنشاء طلب دفع

```json
POST /requesttopay
Content-Type: application/json
X-API-Key: {API_KEY}
X-Signature: {CALCULATED_SIGNATURE}

{
  "amount": 100000,
  "currency": "YER",
  "externalId": "ORD123456",
  "payer": {
    "partyIdType": "MSISDN",
    "partyId": "967712345678"
  },
  "payerMessage": "دفع مقابل خدمة تصميم شعار",
  "payeeNote": "طلب رقم ORD123456",
  "callbackUrl": "https://yemenfreelance.com/payment/callback"
}
```

## التكامل مع نظام الضمان

### 1. نظرة عامة

نظام الضمان هو نظام وسيط يحتفظ بالمبلغ المدفوع من العميل حتى يتم تأكيد استلام الخدمة بشكل مرضٍ. يعمل النظام كطرف ثالث موثوق به لضمان حقوق كل من المستقل والعميل.

### 2. تدفق العمل

1. يقوم العميل بدفع المبلغ إلى حساب الضمان
2. يتم تجميد المبلغ في حساب الضمان
3. يقوم المستقل بتنفيذ الخدمة
4. يقوم العميل بتأكيد استلام الخدمة
5. يتم تحويل المبلغ إلى المستقل بعد خصم العمولة

### 3. واجهة برمجة التطبيقات لنظام الضمان

#### 3.1 إنشاء معاملة ضمان

```json
POST /api/escrow/create
Content-Type: application/json
Authorization: Bearer {API_TOKEN}

{
  "amount": 100000,
  "currency": "YER",
  "client_id": "CLIENT123",
  "freelancer_id": "FREELANCER456",
  "service_id": "SERVICE789",
  "description": "تصميم شعار لشركة",
  "delivery_days": 7,
  "payment_method": {
    "type": "bank",
    "bank_id": "IBY"
  }
}
```

#### 3.2 تأكيد استلام الخدمة

```json
POST /api/escrow/{ESCROW_ID}/complete
Content-Type: application/json
Authorization: Bearer {API_TOKEN}

{
  "rating": 5,
  "feedback": "عمل ممتاز وتسليم في الوقت المحدد"
}
```

#### 3.3 طلب تعديلات

```json
POST /api/escrow/{ESCROW_ID}/request-revision
Content-Type: application/json
Authorization: Bearer {API_TOKEN}

{
  "revision_details": "أرجو تعديل الألوان وتغيير الخط",
  "deadline_extension": 2
}
```

#### 3.4 فتح نزاع

```json
POST /api/escrow/{ESCROW_ID}/dispute
Content-Type: application/json
Authorization: Bearer {API_TOKEN}

{
  "reason": "لم يتم تسليم العمل وفقًا للمواصفات المتفق عليها",
  "evidence": ["evidence_url_1", "evidence_url_2"],
  "resolution_proposal": "استرداد 50% من المبلغ"
}
```

## أمان المعاملات

### 1. تشفير البيانات

- جميع الاتصالات مع واجهات برمجة التطبيقات تتم عبر HTTPS
- تشفير البيانات الحساسة في قاعدة البيانات
- استخدام مفاتيح API وتوقيعات HMAC للتحقق من صحة الطلبات

### 2. التحقق من الهوية

- التحقق من رقم الهاتف عبر رسائل SMS
- التحقق من البريد الإلكتروني
- التحقق بخطوتين للمعاملات الكبيرة

### 3. مراقبة الاحتيال

- نظام آلي لاكتشاف المعاملات المشبوهة
- تحليل أنماط المعاملات للكشف عن الأنشطة غير العادية
- تجميد المعاملات المشبوهة للمراجعة اليدوية

## التعامل مع الأخطاء والاستثناءات

### 1. رموز الحالة

- `200 OK`: تم تنفيذ الطلب بنجاح
- `201 Created`: تم إنشاء المورد بنجاح
- `400 Bad Request`: طلب غير صالح
- `401 Unauthorized`: مصادقة غير صالحة
- `403 Forbidden`: ليس لديك صلاحية للوصول
- `404 Not Found`: المورد غير موجود
- `500 Internal Server Error`: خطأ في الخادم

### 2. هيكل رسائل الخطأ

```json
{
  "error": {
    "code": "INVALID_AMOUNT",
    "message": "المبلغ يجب أن يكون أكبر من الصفر",
    "details": {
      "field": "amount",
      "value": "0",
      "constraint": "amount > 0"
    }
  }
}
```

### 3. استراتيجيات إعادة المحاولة

- إعادة المحاولة تلقائيًا للأخطاء المؤقتة
- استخدام تأخير تصاعدي بين المحاولات
- تحديد الحد الأقصى لعدد المحاولات

## اختبار التكامل

### 1. بيئات الاختبار

- بيئة التطوير: للاختبار الأولي
- بيئة الاختبار: لاختبار التكامل
- بيئة الإنتاج: للمعاملات الحقيقية

### 2. بيانات الاختبار

- أرقام هواتف اختبار: `967700000001` إلى `967700000010`
- مبالغ اختبار: `1000`, `5000`, `10000`, `50000`, `100000`
- حالات اختبار النجاح والفشل

### 3. أدوات الاختبار

- وحدة تحكم المطور للمراقبة والتتبع
- محاكي المدفوعات لاختبار السيناريوهات المختلفة
- أدوات التحقق من صحة الطلبات والاستجابات

## الدعم والموارد

### 1. وثائق المطورين

- دليل التكامل التفصيلي
- مرجع واجهة برمجة التطبيقات
- أمثلة التعليمات البرمجية بلغات مختلفة

### 2. الدعم الفني

- البريد الإلكتروني: dev-support@yemenfreelance.com
- رقم الهاتف: +967-XX-XXXXXX
- نظام تذاكر الدعم: https://developers.yemenfreelance.com/support

### 3. تحديثات وإشعارات

- قائمة بريدية للمطورين
- قناة إشعارات للتغييرات والتحديثات
- جدول زمني للصيانة المجدولة

---

تم تحديث هذا التوثيق في: ديسمبر 2023