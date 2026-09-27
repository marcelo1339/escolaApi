class HomeController {
    index(req, res) {
        res.json({
            deucerto: true,
        });
    }
}

export default new HomeController();
