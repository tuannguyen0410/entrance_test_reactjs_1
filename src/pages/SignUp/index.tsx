import React from 'react';

import signUpBg from 'assets/images/signUp_bg.png';
import AuthenticateLayout from 'components/organisms/AuthenticateLayout';

const SignUp: React.FC = () => (
  <div className="p-signUp">
    <AuthenticateLayout leftBgImage={signUpBg}>
      signUpBg
    </AuthenticateLayout>
  </div>
);

export default SignUp;
