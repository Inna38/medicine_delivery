import css from "./Modal.module.css";

export const Modal = ({ handleToggleModal }) => {
  const handleCloseBackdrop = (e) => {
    const { target, currentTarget } = e;
    if (target === currentTarget) {
      handleToggleModal();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleCloseBackdrop}>
      <div className={css.modal}>
        <span className={css.svg} onClick={handleToggleModal}>
          ╳
        </span>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42353.39313678493!2d34.88648649139383!3d48.435668634106456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe33ed217d1d3%3A0xed878e7d93eee386!2sMcdonald&#39;s!5e0!3m2!1sen!2sus!4v1710186272885!5m2!1sen!2sus"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="map"
        ></iframe>
      </div>
    </div>
  );
};
