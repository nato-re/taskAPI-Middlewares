const senhaDoRL = '123456789'

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) return res.status(401).json({ message: 'token não existe'})
    if(authorization !== senhaDoRL) return res.status(401).json({ message: 'token inválido'})

    next()
}

const validateTaskName = (req, res, next) => {
    const { name } = req.body;
    
    if(name === undefined) return res.status(401).json({ message: 'o campo name não existe'});
    if(name < 3) return res.status(401).json({ message: 'o campo name precisa de ao menos 3 caracteres'});
    
    next()
}

const validateTaskTodo = (req, res, next) => {
    const { status } = req.body;
    
    if(typeof status !== 'boolean') return res.status(401).json({ message: 'o campo status deve ser um booleano'});
    
    next()
}

module.exports = {
    validateToken,
    validateTaskName,
    validateTaskTodo
}