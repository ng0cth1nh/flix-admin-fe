const Pattern = {
    PHONE_NUMBER:"^(03|05|07|08|09|01[2|6|8|9])([0-9]{8})$",
    PASSWORD:"^((?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,10})$",
    FULL_NAME:"^[a-zA-Z\\s]{3,150}$",
    EMAIL:"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
    OTP:"^([0-9]{6})$",
    TEXT_AREA:"^.{0,2500}$"
}
export default Pattern;