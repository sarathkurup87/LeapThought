using LeapThought.Interface;
using LeapThought.Models;
using Newtonsoft.Json;
using System.Text;

namespace LeapThought.Repository
{
    public class Repo : IGet, ISave
    {
        private IWebHostEnvironment webHostEnvironment;
        private readonly string _filePath = string.Empty;
        public Repo(IWebHostEnvironment _environment)
        {
            webHostEnvironment = _environment;
            _filePath = Path.Combine(this.webHostEnvironment.WebRootPath, "_result.json");
        }

        public async Task<List<Label>> ReadJson()
        {
            var _label = new List<Label>();
            try
            {
                FileInfo file = new FileInfo(_filePath);
                if (file.Exists)
                {
                    using (StreamReader r = new StreamReader(_filePath))
                    {
                        string json = await r.ReadToEndAsync();
                        _label = JsonConvert.DeserializeObject<List<Label>>(json);
                    }
                }
            }
            catch { }
            return _label;
        }

        public async Task WriteJson(Label _label)
        {
            try
            {
                var label = new List<Label>();
                label = ReadJson().Result;
                if(label == null) { label = new List<Label>(); }
                label.Add(_label);
                string jsondata = JsonConvert.SerializeObject(label);
                byte[] byteArray = Encoding.ASCII.GetBytes(jsondata);
                string strPath = Path.Combine(this.webHostEnvironment.WebRootPath, "_result.json");
                using (FileStream fs = new FileStream(strPath, FileMode.Create, FileAccess.Write, FileShare.ReadWrite))
                {
                    await fs.WriteAsync(byteArray, 0, byteArray.Length);
                }
            }
            catch { }
        }

    }
}
