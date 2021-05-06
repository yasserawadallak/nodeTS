import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {


  public async excute({ date, provider }: Request): Promise<Appointment> {
    const appoitmentRespository = getCustomRepository(AppointmentRepository)

    const appoitmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appoitmentRespository.findByDate(appoitmentDate);

    if (findAppointmentInSameDate) {

      throw Error('This appointment was already booked')

    }

    const appointment = appoitmentRespository.create({ provider, date });

    await appoitmentRespository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService
