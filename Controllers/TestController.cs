using LeapThought.Interface;
using LeapThought.Models;
using Microsoft.AspNetCore.Mvc;

namespace LeapThought.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;
        private IGet getInterface;
        private ISave saveInterface;
        public TestController(ILogger<TestController> logger, IGet _getInterface, ISave _saveInterface)
        {
            _logger = logger;
            getInterface = _getInterface;
            saveInterface = _saveInterface;
        }

         [Route("getData")]
        [HttpGet]
        public async Task<List<Label>> GetData()
        {
            return await getInterface.ReadJson();
        }

        [HttpPost("saveData")]
        public async Task<IActionResult> SaveData([FromBody] Label label)
        {
            try
            {
                if (label == null)
                {
                    return BadRequest("object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await saveInterface.WriteJson(label);
                return Ok(label);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
