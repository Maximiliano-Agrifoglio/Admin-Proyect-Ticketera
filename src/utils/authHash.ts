import bcrytp from 'bcrypt'; 

const hashPassword = async(password: string) => {
      const salt = await bcrytp.genSalt(10);
      return await bcrytp.hash(password, salt)
};

const checkPassword = async(enteredPassword: string, storedHash: string) => {
      return await bcrytp.compare(enteredPassword, storedHash)
};

export{ hashPassword,checkPassword};