import Background from 'Cards/assets/images/background.jpeg';
import { Colors } from 'Cards/assets/styles/Colors';
import Elements from 'Cards/assets/styles/Elements';
import General from 'Cards/assets/styles/General';
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import Header from 'Cards/src/components/Header';
import IconImage from 'Cards/src/components/IconImage';
import Title from 'Cards/src/components/Title';
import React from 'react';
import AppIcon from 'Cards/assets/images/full-size-logo.png'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { ContainerView, ImageAndTextContainer } from '../settings/SettingsScreenStyled';
import { I18nManager } from 'react-native';



const ConditionsAndTermsScreen  = () => {

  return (
    <>
      <Header />
      <ImageBackground resizeMode='repeat' style={General.flex} source={Background}>

        <ScrollView>
          <ContainerView>
            <ImageAndTextContainer>
              <IconImage
                source={AppIcon}
                style={[ImageStyles.lTeaserImage, { marginBottom: 30 }]}
              />
            </ImageAndTextContainer>
            <View style={{ width: '100%' }}>

            <Title
              color={Colors.SAMI_BLACK}
              style={{
                textAlign: 'left',
                fontSize: 13,
                lineHeight: 20,
              }}
              numberOfLines={0}
              title="Terms and conditions"
            />

            <Title
              color={Colors.SAMI_BLACK}
              style={{
                textAlign: 'left',
                fontSize: 13,
                lineHeight: 20,
              }}
              numberOfLines={0}
              title="Data protection"
            />

            <Title
              color={Colors.SAMI_BLACK}
              style={{
                textAlign: 'left',
                fontSize: 13,
                lineHeight: 20,
              }}
              numberOfLines={0}
              title="We will abide by our privacy policy when you use any personal information you provide to us when you use this app"
            />

            <Title
              color={Colors.SAMI_BLACK}
              style={{
                textAlign: 'left',
                fontSize: 13,
                lineHeight: 20,
                marginVertical: 10,
              }}
              numberOfLines={0}
                title="All trade marks, copyright, database rights in the intellectual property rights of materials on this app (as well as the design and layout of the site) along with the programming codes are the private ownership either directly from us or from other licensed from us."
            />
              <Title
                color={Colors.SAMI_BLACK}
                style={{
                  textAlign: 'left',
                  fontSize: 13,
                  lineHeight: 20,
                }}
                numberOfLines={0}
                title="You may not copy, modify, alter, publish, broadcast, distribute, sell or transfer any material or code programming on this app, whether in whole or in part without prior written permission. However, the contents of this application can be downloaded or printed or copied for personal use or commercial"
              />
              <Title
                color={Colors.SAMI_BLACK}
                style={{
                  textAlign: 'left',
                  fontSize: 13,
                  lineHeight: 20,
                  marginVertical:10,
                }}
                numberOfLines={0}
                title={I18nManager.isRTL ? `. الاستخدام العادل
يمكنك استخدام هذا التطبيق فقط في حال موافقتك الشروط والأحكام الخاصة بالموقع. وعلى أية حال، ولأغراض قانونية فإن استخدامك التطبيق يعني موافقتك على القوانين واللوائح المنظمة لهذا الشأن والمعمول بها في المملكة الاردنيه. تحديداً، أنت توافق على أنك لن تقوم بالأعمال التالية:
•	التلاعب أو إجراء أي تغيير بالتصميم العام لتطبيق أو الأكواد البرمجية.
•	إجراء أي تحويل آخر غير مصرح به، كاذب أو احتيالي.
•	استخدام هذا التطبيق بطريقة تسبب أو قد تتسبب انتهاك في حقوق أي طرف آخر.

•	نشر، نقل أو إدخال أي معلومات ضارة، مسيئة أو خادشة للحياء أو غير مصرح بها، كاذبة أو احتيالية،.
•	استخدام أي برمجية أو دودة خبيثة في محاولة للتدخل الإلكتروني أو يدوي مع نظام التشغيل، العمليات أو وظائف هذا التطبيق بما في ذلك على سبيل المثال لا الحصر، إتاحة ملفات تحتوي على بيانات معطوبة أو الفيروسات.
•	اتخاذ أي إجراء يتسبب في بطء التطبيق أو استهلاك كبير وغير معقول لموارده.

إجراء أية تغييرات أو تعديلات على التطبيق
يجوز لنا إجراء تحسينات أو تغييرات على المعلومات، الخدمات، المنتجات وغيرها من المواد على هذا التطبيق، أو إيقافه نهائياً ، في أي وقت دون سابق إنذار. يجوز لنا أيضاً تعديل هذه الشروط والأحكام في أي وقت، ويصبح هذا التعديل فعالاً فور نشر البنود والشروط المعدلة على هذا الموقع. وبناء على ذلك، يعتبر استمرار دخولك أو استخدامك لموقع الويب هذا بمثابة قبولك للبنود والشروط الجديدة.` :`. Fair use
You can use this application only if you agree to the terms and conditions of the site. In any event, for legal purposes, your use of the application means your acceptance of the laws and regulations governing this matter in force in the kingdom of Jordan. Specifically, you agree that you will not the following work:
* Manipulate or make any change to the overall design of the application or code.
* Make any other unauthorised, false or fraudulent transfer.
* Use this application in a way that causes or may cause a violation of the rights of any third party.

* Publish, transmit or enter any harmful, abusive, indecent, unauthorised, false or fraudulent information.
• The use of any software or malicious worm in trying to e-mail or manually with the operating system, processes or functions of this application including, but not limited to, making available files containing corrupt data or viruses.
* Take any action that causes a slow application or a large and unreasonable consumption of its resources.

Make any changes or modifications to the application.
We may make improvements or changes to the information, services, products and other material on this application, or stop permanently, at any time without notice. We may also amend these terms and conditions at any time, and this becomes the amendment effective immediately upon posting the amended terms on this site. Accordingly, your continued access to or use of this website constitutes your acceptance of the new terms and conditions.`}
              />
</View>
            <View style={Elements.loginFieldsContainer} />
          </ContainerView>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ConditionsAndTermsScreen ;


