import AuthFlow from "../../components/auth/AuthFlow";
import Image from "next/image";
import authImage from "../../public/loginImage.png";

export default function AuthPage() {
  return (
    <div className="w-full flex-grow flex items-center justify-center relative">
      <div className="hidden lg:block absolute left-0 top-0 h-full w-1/2 bg-gray-900 object-cover">
        <Image
          src={authImage}
          alt="auth_banner_image"
          className="object-cover"
          fill
        />
      </div>

      <div className="w-full lg:w-1/2 lg:ml-auto flex items-center justify-center p-8 z-10">
        <div className="max-w-md w-full">
          <AuthFlow />
        </div>
      </div>
    </div>
  );
}
