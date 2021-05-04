



class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor(provider: string, date: Date){
    this.id = '0';
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment
