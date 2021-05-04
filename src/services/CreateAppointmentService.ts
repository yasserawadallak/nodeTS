import {startOfHour} from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import appointmentsRouter from '../routes/appointments.routes';

interface Request{
  provider: string;
  date: Date;
}

class CreateAppointmentService{

  private appoitmentRespository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository){
    this.appoitmentRespository = appointmentRepository;
  }

  public excute({date, provider}: Request): Appointment {
    const appoitmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appoitmentRespository.findByDate(appoitmentDate);

    if(findAppointmentInSameDate){
      throw Error('This appointment was already booked');
    }

    const appointment = this.appoitmentRespository.create({provider, date});

    return appointment;
  }
}

export default CreateAppointmentService
