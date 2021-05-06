import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import User from '../models/User'

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {


  public async excute({ date, provider_id }: Request): Promise<Appointment> {
    const appoitmentRespository = getCustomRepository(AppointmentRepository)

    const appointmentDate = startOfHour(date);


    const findAppointmentInSameDate = await appoitmentRespository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {

      throw new Error('This appointment was already booked')

    }

    const appointment = appoitmentRespository.create(
      {
        provider_id, date: appointmentDate });

    await appoitmentRespository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService
