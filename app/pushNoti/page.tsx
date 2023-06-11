'use client'

import addNotification from "react-push-notification";
import cocomi from '@/public/cocomi.png';

export default function pushNoti() {
    
  const clickNotify = () => {
    const imageSrc = cocomi.src;
    const imageBlob = fetch(imageSrc).then((res) => res.blob());

    imageBlob.then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        const base64data = reader.result as string;

        const notification = new Notification("code with u", {
          body: "hohoho",
          icon: base64data,
        });

        notification.addEventListener("click", () => {
          window.location.href = "http://www.cgv.co.kr/ticket/";
        });
      };
    });
  };

  return (
    <div>
      <button onClick={clickNotify}>Click</button>
    </div>
  );
}