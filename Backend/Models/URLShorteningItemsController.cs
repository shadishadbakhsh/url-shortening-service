using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using URLShortening.Services;
using URLShorteningApi.Models;

namespace URLShortening.Models
{
    [Route("shorten")]
    [ApiController]
    public class URLShorteningItemsController : ControllerBase
    {
        private readonly URLShorteningContext _context;
        private readonly UrlShorteningService _shorteningService;

        public URLShorteningItemsController(URLShorteningContext context)
        {
            _context = context;
            _shorteningService = new UrlShorteningService();
        }

        // GET: api/URLShorteningItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<URLShorteningItem>>> GetURLShorteningItems()
        {
          if (_context.URLShorteningItems == null)
          {
              return NotFound();
          }
            return await _context.URLShorteningItems.ToListAsync();
        }

        // GET: api/URLShorteningItems/5
        [HttpGet("{shortCode}")]
        public async Task<ActionResult<URLShorteningItem>> GetURLShorteningItem(string shortCode)
        {
          if (_context.URLShorteningItems == null)
          {
              return NotFound();
          }

            var uRLShorteningItem = await _context.URLShorteningItems
      .FirstOrDefaultAsync(x => x.shortCode == shortCode);

            if (uRLShorteningItem == null)
            {
                return NotFound();
            }

            uRLShorteningItem.accessCount++;
            await _context.SaveChangesAsync();

            //  return uRLShorteningItem;
            // return Ok(uRLShorteningItem.url);
            return Redirect(uRLShorteningItem.url);

        }

        // PUT: api/URLShorteningItems/5
        [HttpPut("{shortCode}")]
        public async Task<IActionResult> PutURLShorteningItem(string shortCode, URLShorteningItem Item)
        {
            if (string.IsNullOrWhiteSpace(shortCode) || Item == null)
            {
                return BadRequest();
            }

            var existingItem = await _context.URLShorteningItems
                .FirstOrDefaultAsync(x => x.shortCode == shortCode);
            if (existingItem == null)
                return NotFound();

            existingItem.url = Item.url;
            existingItem.updatedAt = DateTime.UtcNow.ToString("o");

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!URLShorteningItemExists(shortCode))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/URLShorteningItems
        [HttpPost]
        public async Task<ActionResult<URLShorteningItem>> PostURLShorteningItem(URLShorteningItem Item)
        {
 
            if (string.IsNullOrWhiteSpace(Item.url))
            {
                return BadRequest("URL cannot be empty.");
            }

            var shortCode = _shorteningService.GenerateShortCode(Item.url);
            var entity = new URLShorteningItem
            {
                url = Item.url,
                shortCode = shortCode
            };

            _context.URLShorteningItems.Add(entity);
            await _context.SaveChangesAsync();

           // return CreatedAtAction(nameof(GetURLShorteningItem), new { id = Item.id }, entity);
            var shortUrl = $"https://localhost:7060/shorten/{shortCode}";
            return Ok(shortUrl);


        }

        // DELETE: api/URLShorteningItems/5
        [HttpDelete("{shortCode}")]
        public async Task<IActionResult> DeleteURLShorteningItem(string shortCode)
        {
            if (_context.URLShorteningItems == null)
            {
                return NotFound();
            }

            var uRLShorteningItem = await _context.URLShorteningItems
                .FirstOrDefaultAsync(x => x.shortCode == shortCode);
            if (uRLShorteningItem == null)
            {
                return NotFound();
            }

            _context.URLShorteningItems.Remove(uRLShorteningItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{shortCode}/stats")]
        public async Task<ActionResult<URLShorteningItem>> GetShortUrlStats(string shortCode)
        {
            if (_context.URLShorteningItems == null)
            {
                return NotFound();
            }
            var item = await _context.URLShorteningItems
       .FirstOrDefaultAsync(x => x.shortCode == shortCode);

            if (item == null)
                return NotFound();

            return Ok(item);
        }

            private bool URLShorteningItemExists(string shortCode)
        {
            return _context.URLShorteningItems.Any(e => e.shortCode == shortCode);
        }
    }
}
