const m=document.querySelector('.menu'),p=document.querySelector('.mobile');
if(m&&p){m.onclick=()=>p.classList.toggle('open');p.querySelectorAll('a').forEach(a=>a.onclick=()=>p.classList.remove('open'))}

const serviceButtons=document.querySelectorAll('.choose-service');
const selectedService=document.querySelector('#selectedService');
const selectedPrice=document.querySelector('#selectedPrice');
serviceButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    selectedService.textContent=btn.dataset.service;
    selectedPrice.textContent=btn.dataset.price ? ' · '+btn.dataset.price : '';
    document.querySelector('#booking').scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>document.querySelector('#clientName')?.focus(),500);
  });
});

const form=document.querySelector('#bookingForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.querySelector('#clientName').value.trim();
    const phone=document.querySelector('#clientPhone').value.trim();
    const date=document.querySelector('#clientDate').value;
    const comment=document.querySelector('#clientComment').value.trim();
    const service=selectedService?.textContent || 'не выбрана';
    const price=selectedPrice?.textContent || '';
    const message=`Здравствуйте! Хочу записаться в ASHELLAC.%0A%0AУслуга: ${encodeURIComponent(service)}${encodeURIComponent(price)}%0AИмя: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}%0AДата: ${encodeURIComponent(date||'не указана')}%0AКомментарий: ${encodeURIComponent(comment||'нет')}`;
    const success=document.querySelector('#formSuccess');
    success.hidden=false;
    success.innerHTML=`Заявка заполнена. <a href="https://vk.ru/clubashellac2014" target="_blank"><b>Открыть VK и отправить сообщение →</b></a>`;
    // Сохраняем подготовленный текст, чтобы следующий этап мог отправлять его в CRM/сервис записи.
    form.dataset.message=message;
  });
}
