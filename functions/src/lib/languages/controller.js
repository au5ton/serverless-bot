const languages = [
    { name: 'English', code: 'en_us' },
    { name: 'Spanish', code: 'es_sp' },
    { name: 'French', code: 'fr_fr' }
]

module.exports.getAllLanguages = (req, res) => {
    return res.json({
        success: true,
        data: languages
    })
}

module.exports.getLanguage = (req, res) => {
    const requiredLang = req.params.language;
    const lang = languages.filter(lang => lang.name === requiredLang)
    const exists = lang.length > 0

    return res.status(exists ? 200 : 400)
              .json({
                  success: exists,
                  data: exists ? lang[0] : `Language not found`
              })
}
