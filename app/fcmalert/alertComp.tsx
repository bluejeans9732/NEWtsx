import { useState } from "react";


export default function AlertComp () {

    const [registrationToken, setRegistrationToken] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const sendNotification = async () => {
        const url = '/api/fcm/alert';
    
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ registrationToken, title, body }),
        });
    
        if (response.ok) {
          console.log('Notification was successfully sent.');
          // 알림 권한 요청
          if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(function (permission) {
              if (permission === 'granted') {
                console.log('Notification permission granted.');
              } else {
                console.log('Notification permission denied.');
              }
            });
          }
        } else {
          console.error('An error occurred while sending the notification.');
        }
      };
    

    return (
        <div  className='flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='w-1/3 h-[40%] p-4 rounded-xl  shadow-xl bg-white flex flex-col'>
                <h4 className='mt-4 mb-3 text-center text-2xl text-cyan-900 font-bold'>알람 보내기</h4>
                <input
                    type="text"
                    value={registrationToken}
                    onChange={(e) => setRegistrationToken(e.target.value)}
                    placeholder="보낼 알람의 Token을 적어주세요"
                    className='w-4/5 mx-auto mt-6 p-2 shadow-md focus:outline-none focus:border-none'
                />
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    className='w-4/5 mx-auto mt-6 p-2 shadow-md focus:outline-none focus:border-none'
                />
                <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="내용"
                    className='w-4/5 mx-auto mt-6 p-2 shadow-md focus:outline-none focus:border-none'
                />
                <button 
                    onClick={sendNotification}
                    className='mt-10 bg-emerald-300 w-1/2 mx-auto rounded-lg p-2'
                >
                    알림 발송
                </button>
            </div>
        </div>
    )
}