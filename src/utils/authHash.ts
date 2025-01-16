import bcrytp from 'bcrypt'; 

const hashPassword = async(password: string) => {
      const salt = await bcrytp.genSalt(10);
      return await bcrytp.hash(password, salt)
}

export default hashPassword;