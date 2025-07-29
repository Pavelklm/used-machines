import MainButton from '@/components/module/mainButton/mainButton'
import './style.css'

export const Info = () => {
  return (
    <div className='info'>
      <div className='container info__container'>
        <div className='info__main'>
          <div className='info__main__left'>
            <h1 className='info__main__title'>
              Перевірене вживане обладнання для м’ясної промисловості
            </h1>
            <h2 className='info__main__subtitle'>
              Надійне обладнання для вашого виробництва — <br /> з гарантією
              та професійною підтримкою
            </h2>
            <MainButton />
          </div>
          <div className='info__main__right'>
            <img src='/icons/grinder.png' alt='grinder' />
          </div>
        </div>
      </div>
      <div className='info__benefit'>
        <div className='full-width-line' />
        <div className='container'>
          <ul className='info__benefit__list list-reset'>
            <li className='info__benefit__item'>
              <img
                className='info__benefit__item__img'
                src='/icons/approved.svg'
                alt='approved'
              />
              <p>Кожна техніка проходить повну перевірку.</p>
            </li>
            <li className='info__benefit__item'>
              <img
                className='info__benefit__item__img'
                src='/icons/approved.svg'
                alt='approved'
              />
              <p>Швидка доставка по Україні.</p>
            </li>
            <li className='info__benefit__item'>
              <img
                className='info__benefit__item__img'
                src='/icons/approved.svg'
                alt='approved'
              />
              <p>Допомагаємо підібрати рішення для вашого виробництва.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
